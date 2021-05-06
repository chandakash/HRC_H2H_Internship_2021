import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from '@material-ui/core/styles';
import PanelTable from './PanelTable';
import InceptionTable from './InceptionTable';
// const INCEPTION_URL = `https://picsum.photos/v2/list?page=${pageCount}&  limit=10%60`


const useStyles = makeStyles({
  inception:{
      paddingLeft: '30px',
      paddingRight:'30px',
      margin:'auto'
  },
  head:{
    color:'#97A1A9'
  }
})

function InfiniteScrollTable() {

  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);

  useEffect(() => {
    try{
      const fetchData = async()=>{
        const response = await axios.get(`https://picsum.photos/v2/list?page=${pageCount}&  limit=10%60`)
        // console.log(response);
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
      }
      fetchData();
    }catch(error){
      console.log(error);
    }
  }, [pageCount]);

  function fetchMoreData() {
    setCount(pageCount + 1); 
  }

  const classes = useStyles();

  return (
    <div className={classes.inception} >      
      <InfiniteScroll
        dataLength={responseData.length}//length of our responseData
        next={fetchMoreData} //pass the function which will load more data
        hasMore={isNext}   //whether to call next component while scrolling or not.
        scrollableTarget="scrollableDiv"
      >
      {/* <PanelTable responseData={responseData} /> */}
      <InceptionTable responseData={responseData} />
      </InfiniteScroll>
    </div>
  );
}
export default InfiniteScrollTable;
