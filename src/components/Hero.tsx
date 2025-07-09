import { useInView } from "react-intersection-observer";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="
        relative
        w-full
        min-h-screen
        mx-auto
        px-6 md:px-20
        py-16
        flex flex-col md:flex-row
        items-center
        justify-between
        gap-10
        overflow-x-hidden
      "
      aria-label="Introduction section"
    >
      {/* Left Content */}
      <div className="flex flex-row items-start gap-5 max-w-full md:max-w-lg flex-shrink-0">
        <div className="flex flex-col justify-start items-center mt-1">
          {/* Accent Dot */}
          <div
            className="w-5 h-5 rounded-full bg-space-primary"
            aria-hidden="true"
            style={{ willChange: "transform" }}
          />
          <div
            className="w-1 sm:h-72 h-36 bg-gradient-to-r from-[#60c565] to-transparent"
            aria-hidden="true"
            style={{ willChange: "height" }}
          />
        </div>

        {/* Text Content */}
        <div>
          <h1 className={`${styles.heroHeadText} text-space-textPrimary leading-tight`}>
            Hey, I'm <span className="text-space-primary">Aniraj</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-space-textSecondary`}>
            I am a Backend Developer,
            <br className="sm:block hidden" />
            specialized in Python.
          </p>
        </div>
      </div>

      {/* Right Canvas: Only render when in view */}
      {inView && (
        <div
          className="
            w-full
            max-w-[600px]
            h-auto
            aspect-[1/1]
          "
        >
          <ComputersCanvas cameraPosition={[0, 0, 5]} />
        </div>
      )}

      {/* Scroll down indicator */}
<div className="absolute xs:bottom-5 bottom-32 w-full flex justify-center items-center">
  <a href="#about" aria-label="Scroll down to About section">
    <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
      <div className="w-3 h-3 rounded-full bg-secondary mb-1 animate-scrollDot"></div>
    </div>
  </a>
</div>

    </section>
  );
};

export default Hero;
