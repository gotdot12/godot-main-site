'use client';


import styles from '../styles';
import { TitleText, TypingText } from '../components';

const ComingSoon = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
      <TypingText title="| Upcoming Updates" textStyles="text-center" />
      <TitleText
        title={(
          <>GODOT SEED ROUND is live and participate now 🔥🔥</>
        )}
        textStyles="text-center"
      />
    </div>
  </section>
);

export default ComingSoon;