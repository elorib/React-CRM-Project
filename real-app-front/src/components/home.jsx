import PageHeader from "./common/pageHeader";

const Home = () => {
  return (
    <PageHeader
      title={
        <>
          Real <i className="bi bi-geo-fill"></i>App
        </>
      }
      description={"Lorem ipsum dolor sit amet"}
    />
  );
};

export default Home;
