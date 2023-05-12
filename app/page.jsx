import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
  return (
    <section className='w-full flex flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover awesome prompts & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> AI Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Unleash AI-powered prompts. Inspire endless creativity. Share and
        inspire today.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
