import serverContext from 'server-only-context';



export const [getAuth, setAuth] = serverContext(null)