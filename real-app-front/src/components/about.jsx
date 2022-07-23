import PageHeader from "../components/common/pageHeader";

const About = () => {
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

export default About;
