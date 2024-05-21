import Banner from "../components/Banner"
import Rowposter from "../components/Rowposter"
import endpoints from "../services/Movieservices"

function Home() {
 const {popular,topRated,trending,comedy,upcoming,ScienceFiction,action,Romantic}=endpoints
  return (
    <div>
        <Banner/>
        <Rowposter title='upcoming' url={upcoming}/>
        <Rowposter title='topRated' url={topRated}/>
        <Rowposter title='trending ' url={trending} />
        <Rowposter title='popular'  url={popular} />
        <Rowposter title='comedy' url={comedy} />
        <Rowposter title='ScienceFiction' url={ScienceFiction} />
            <Rowposter title='action' url={action} />
            <Rowposter title='Romantic' url={Romantic} />
    </div>
  )
}

export default Home
