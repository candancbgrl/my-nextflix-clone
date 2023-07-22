import React,{useCallback} from 'react'
import Link from 'next/link';
import useCurrentUser from "@/hooks/useCurrentUser";
import useChilds from "@/hooks/useChilds";
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

type AccountMenuProps = {
    visible: any;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {

    const { data: current } = useCurrentUser();
    const { data: childs } = useChilds();

    const router = useRouter();
    const { childUsername } = router.query;

    
    const routeCurrentUserHome = useCallback(() => {
        router.push('/');
    }, [router]);
    const routeHome = useCallback((childUsername: any) => {
        router.push({
            pathname:'/',
            query:{childUsername}
        });
    }, [router]);
    if (!visible) return null;
    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
                    <p onClick={routeCurrentUserHome} className="text-white text-sm group-hover/item:underline">{current?.name}</p>
                </div>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4" />
            {
                childs?.map((item: any) => (
                    item?.userId === current?.id ? <>
                        <div className="flex flex-col gap-3">
                            <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                                <img className="w-8 rounded-md" src="/images/default-red.png" alt="" />
                                <p key={item?.id} onClick={()=>routeHome(item?.name)} className={item?.name === childUsername ? "text-white font-bold text-sm group-hover/item:underline" : "text-gray-500 text-sm group-hover/item:underline"}>{item?.name}</p>
                            </div>
                        </div>
                        <br />
                    </> : null
                ))
            }
            <hr className="bg-gray-600 border-0 h-px my-4" />
            <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                Sign out of Netflix
            </div>
        </div>
    )

}

export default AccountMenu;
