import banner from '../../assets/banner.jpg'
const Banner = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${banner})`}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-3xl md:text-5xl font-bold">Welcome to StudyHub</h1>
        <p className="mb-5">StudyHub is a dynamic online platform designed to revolutionize the way students learn and collaborate. Our website provides a comprehensive suite of tools and resources to enhance the educational experience</p>
       
      </div>
    </div>
  </div>
  );
};

export default Banner;
