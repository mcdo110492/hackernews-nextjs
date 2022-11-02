import { GetServerSideProps } from "next"
import Head from "next/head"
import { HackerNewsItem } from "../interfaces"
import { getSortedStoriesByScore } from "../lib/topstories"

import styles from "../styles/Home.module.scss"

import Article from "../components/Article"


interface Props {
  data?: HackerNewsItem[];
  errors?: string;
}


const IndexPage = ({ data, errors }: Props) => {

  if(errors) {
    return (
      <div className={styles.container}>
        <h1 className={styles['page-error']}>There&apos;s an error processing your request. Please refresh your browser again.</h1>
      </div>
    )
  }

  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <div className={styles.container}>
      <h1 className={styles['page-title']}>Hacker News Top Stories</h1>
      <main className={styles.main}>
        <div className={styles.grid}>
        {data?.map(story => (<Article key={story.id} article={story} />)) }
        </div>
        
      </main>
    
    </div>
    </>
   )
}


export default IndexPage;



export const getServerSideProps: GetServerSideProps = async ({res, req}) => {
  
  try {
    const stories = await getSortedStoriesByScore()
  
    return { props: { data: stories}}
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
 
}