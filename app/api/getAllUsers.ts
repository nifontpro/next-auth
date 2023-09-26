export function getAllUsers(): Promise<User[]> {
  return fetch('http://localhost:8080/all',
      // {cache: "force-cache"} // default, SSG (getStaticProps)
      // {cache: "no-store"} // SSR (getServerSideProps)
      // {next: {revalidate: 60}} // ISR
  ).then(res => res.json())
}