import AdminDashboard from "@/components/templates/AdminDashboard";
import StaffDashboard from "@/components/templates/StaffDashboard";
import { useHooks } from "../../hooks/dashboard/hooks";
import Loading from "@/components/parts/Loading";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

const DashboardPage = () => {
  const { user, status, projects } = useHooks();

  console.log(projects);

  if (status === "loading" && !projects) {
    return <Loading />;
  }

  const renderDashboard = () => {
    if (user?.user?.role === "admin") {
      return <AdminDashboard />;
    } else {
      return <StaffDashboard projects={projects} />;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default DashboardPage;

// export async function getServerSideProps(context: CtxOrReq) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
