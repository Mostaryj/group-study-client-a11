import banner from '../../assets/banner.jpg'
const Banner = () => {
  return (
    <div className="hero w-full h-[280px] md:h-[450px]" style={{backgroundImage: `url(${banner})`}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="text-white">
        <h1 className="mb-5 text-3xl md:text-5xl font-bold dark:text-gray-300">Welcome to StudyHub</h1>
        <p className="mb-5 max-w-md">StudyHub is a dynamic online platform designed to revolutionize the way students learn and collaborate. Our website provides a comprehensive suite of tools and resources to enhance the educational experience</p>
       
      </div>
    </div>
  </div>
  );
};

export default Banner;
