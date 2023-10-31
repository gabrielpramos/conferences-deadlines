import NextHead from 'next/head';

const Head = () => (
  <NextHead>
    <title>CESAR School Conferences Deadlines</title>
    <meta name='title' content='CESAR School Conferences Deadlines' />
    <meta
      name='description'
      content='Follow up conferences deadlines, location, places and rank the conferences'
    />

    {/* Open Graph / Facebook */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://www.cesar.school/' />
    <meta property='og:title' content='CESAR School Conferences Deadlines' />
    <meta
      property='og:description'
      content='Follow up conferences deadlines, location, places and rank the conferences'
    />
    <meta
      property='og:image'
      content='https://www.cesar.school/wp-content/uploads/2019/09/marca_cesar_school-100x79.png'
    />

    {/* Twitter */}
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:url' content='https://www.cesar.school/' />
    <meta
      property='twitter:title'
      content='CESAR School Conferences Deadlines'
    />
    <meta
      property='twitter:description'
      content='Follow up conferences deadlines, location, places and rank the conferences'
    />
    <meta
      property='twitter:image'
      content='https://www.cesar.school/wp-content/uploads/2019/09/marca_cesar_school-100x79.png'
    />

    <link
      rel='icon'
      href='https://www.cesar.school/wp-content/uploads/2017/11/favicon_school.png'
      sizes='32x32'
    ></link>
    <link rel="icon" href="https://www.cesar.school/wp-content/uploads/2017/11/favicon_school.png" sizes="192x192"></link>
  </NextHead>
);

export default Head;
