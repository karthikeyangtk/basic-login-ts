import { Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";
import { request } from "../../service";
import { UrlConstants } from "../../constants/UrlConstants";
import { removeFromStorage } from "../../utills/helper";
import { localStorageConstants } from "../../constants/localstorageConstants";
import { RouteConstants } from "../../constants/routeConstants";
import {
  DivSignoutContainer,
  DivTableContainer,
  DivSignoutButton,
  DivLoading,
  DivNoDataFound,
} from "./headers.styles";

type UserList = {
  name?: string,
  email?: string,
  status?: number,
  _id?: string,
};

/**
 * Contains sign out
 */
export default function Header() {
  const navigate = useNavigate();
  const { ADMIN_SIGN_OUT, ADMIN_USER_LIST } = UrlConstants;
  const { AUTH_TOKEN } = localStorageConstants;

  const { data = {}, isLoading } = useQuery(["list"], async () => {
    return await request(
      `${ADMIN_USER_LIST}?skip=0&limit=10`,
      "get",
      {},
      navigate
    );
  });

  const signOutfn = useMutation(["logout"], async () => {
    return logoutfun();
  });

  /**
   * Admin sign out
   */
  const logoutfun = () => {
    request(ADMIN_SIGN_OUT, "post", {}, navigate)
      .then((data) => {
        if (+data?.status === 1) {
          removeFromStorage(AUTH_TOKEN);
          toast.success(data.message || "");
          navigate(RouteConstants.DEFAULT_PATH);
        } else {
          toast.error(data?.message || "");
        }
      })
      .catch((err) => {
        console.error(`error in ADMIN_SIGN_OUT ${err}`);
        toast.error("Something went wrong");
      });
  };

  return (
    <DivSignoutContainer>
      <h3>Dashboard</h3>
      <DivTableContainer>
        {isLoading && <DivLoading>Loading...!</DivLoading>}
        {!isLoading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.resulta?.length > 0 ? data?.data?.result?.map((item: UserList, index: number) => {
                return (
                  <tr key={item?._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.name || ""}</td>
                    <td>{item?.email || ""}</td>
                    <td>{item?.status === 1 ? "Active" : "In Active"}</td>
                  </tr>
                );
              }): <DivNoDataFound>No data Found</DivNoDataFound>}
            </tbody>
          </table>
        )}
      </DivTableContainer>
      <DivSignoutButton>
        <Col xs={12} className="logout-button">
          <Button
            title="Logout"
            variant="info"
            onClick={(e) => {
              e.preventDefault();
              signOutfn.mutate();
            }}
          >
            Logout
          </Button>
        </Col>
      </DivSignoutButton>
    </DivSignoutContainer>
  );
}
