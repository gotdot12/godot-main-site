'use client';

import { useState } from 'react';

import styles from '../styles';
import { exploreWorlds } from '../constants';
import { ExploreCard, TitleText, TypingText } from '../components';

const Explore = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText
          title={<>Explore the features <br className="md:block hidden" /> of GODOT network</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;