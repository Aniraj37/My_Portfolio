import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from "../constants";
import { fadeIn, textVariant } from '../utils/motion'; 
import { SectionWrapper } from '../hoc';
const ServiceCard = ({index, title, icon}:{index:number, title:string, icon:string}) => (
  <Tilt
    className='xs:w-[250px] w-full'
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant(1)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
      An enthusiastic, motivated, and results-driven individual seeking to build a career in software development within a progressive and professionally managed organization. With a strong passion for coding and hands-on experience in Python technologies, I am eager to contribute to any team. I am highly coachable and thrive in a collaborative environment. 
 
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) =>
          <ServiceCard key={service.title} index={index} {...service} />
        )}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")