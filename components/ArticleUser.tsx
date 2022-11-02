import React, { ReactNode, useEffect, useState } from "react"
import Image from "next/image"

import { getUserById } from "../lib/topstories"
import { HackerNewsUser } from "../interfaces"

import styles from "../styles/components/Article.module.scss"


type Props = {
    id: string|undefined;
}


const ArticleUser = ({ id }: Props) => {

    const [user, setUser] = useState<HackerNewsUser>({
        id: "",
        created: "",
        karma: 0,
        about: "",
        submitted: [],
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            if(id) {
                const data = await getUserById(id)
                setUser(data)
            }
        }
        fetchUser()

    }, [id])

    if(!user.id) {
        return (<p></p>)
    }
    
    
    return (
        <div className={styles['avatar-container']}>
            <Image className={styles.avatar} src="/avatar2.png" width={40} height={40} alt={user?.id ?? 'Avatar Image'} />
            <div className={styles.user}>
                <ul className={styles['user-list']}>
                    <li>{user?.id}</li>
                    <li>Karma: {user?.karma}</li>
                </ul>
            </div>
            
        </div>
    )
};

export default ArticleUser;