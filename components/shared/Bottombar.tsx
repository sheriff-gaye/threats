"use client"
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname,useRouter} from 'next/navigation'

function BottomBar()
{
    const router=useRouter();
    const pathname=usePathname();
    return(
       <section className="bottombar">
        <div className="bottombar_container">
        {sidebarLinks.map((link) => {
            const isActive=(pathname.includes(link.route) && link.route.length>1) || pathname===link.route; 
            return(
                <Link href={link.route} key={link.label} className={`bottombar_link  ${isActive && 'bg-primary-500'}`}>
            <Image src={link.imgURL} alt="icon" height={24} width={24} />
            <p className="text-light-1 max-lg:hidden">{link.label.split(/\+/)[0]}</p>
          </Link>
            
        )})}
        </div>

       </section>
    )
}

export  default BottomBar