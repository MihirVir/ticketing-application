import BuildClient from "../api/build-client";

const LandingPage = ({ current_user }) => {
  // console.log(current_user);
  console.log(current_user);
  return (
    <>
      <h1>Landing Page {current_user.id}</h1>
    </>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = BuildClient(context)
  const response  = await client
                    .get("/api/users/current-user")
              
  
  return response.data;
}

export default LandingPage;
