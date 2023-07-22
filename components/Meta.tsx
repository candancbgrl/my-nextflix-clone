import Head from "next/head";

type MetaProps = {
  description: any;
  title: any;
  keywords: any;
};

const Meta: React.FC<MetaProps> = ({ description, title, keywords }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </div>
  );
};
Meta.defaultProps = {
  title: "Post List WebSite",
  keywords: "NextJS React",
  description: "lorem ipsum",
};

export default Meta;
