import React, { useCallback } from "react";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useChilds from "@/hooks/useChilds";
import { useRouter } from "next/router";
import UserCard from "@/components/UserCard";
import { NextPageContext } from "next";
import Meta from "@/components/Meta";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter();

  const routeHome = useCallback(
    (childUsername: any) => {
      router.push({
        pathname: "/",
        query: { childUsername },
      });
    },
    [router]
  );

  const { data: current } = useCurrentUser();
  const { data: childs } = useChilds();

  return (
    <div className="flex items-center h-full justify-center mt-24">
      <Meta title="Profiles" />
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who's watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="flex flex-col gap-8">
            <div onClick={() => routeHome(current?.name)}>
              <UserCard name={current?.name} />
            </div>
            <div className="flex flex-row gap-4">
              {childs?.map((item: any) =>
                item?.userId === current?.id ? (
                  <div onClick={() => routeHome(item?.name)}>
                    <UserCard name={item.name} />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
