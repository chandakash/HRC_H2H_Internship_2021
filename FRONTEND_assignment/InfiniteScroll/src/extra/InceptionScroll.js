import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import InceptionTable from "./InceptionTable";
import { makeStyles } from '@material-ui/core/styles';

// const INCEPTION_URL = `https://picsum.photos/v2/list?page=${pageCount}&  limit=10%60`


const useStyles = makeStyles({
  inception:{
      width: '80%', height: '50%',
      marginTop: '50px',
      margin: 'auto',
      backgroundColor: '#273D49CC'
  },
  head:{
    marginLeft:'43%',
    color:'#97A1A9'
  }
})

function InceptionScroll() {

  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(0);

  useEffect( async() => {
    try{
        const response = await axios.get(`https://picsum.photos/v2/list?page=${pageCount}&  limit=10%60`)
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
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
      
        <h1 className={classes.head}>INCEPTION</h1>
      
      <InfiniteScroll
        dataLength={responseData.length}//length of our responseData
        next={fetchMoreData} //pass the function which will load more data
        hasMore={isNext}   //whether to call next component while scrolling or not.
        // loader={
        //   <div style={{ height: "50%", paddingLeft: "35%", overflow: "hidden" }}>
        //     <CircularProgress />
        //   </div> 
        // }
        scrollableTarget="scrollableDiv"
      >
      <div >
      <InceptionTable responseData={responseData} />
      </div>
      <div>
        <h1 className={classes.head}>SCROLLING</h1>
      </div>

      </InfiniteScroll>
    </div>
  );
}
export default InceptionScroll;
