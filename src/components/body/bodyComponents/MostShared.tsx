import React, { useState, useEffect } from "react";

const MostShared = (props:any) => {
    const withBorderDesign = "col-lg-4 col-md-12 border-end border-bottom"
    const withoutBorderDesign = "col-lg-4 col-md-12 border-bottom"
    const dateDiff = (received_date:string) => {
        received_date = received_date.replace(" ", "T")
        const date1:any = new Date(received_date);
        const date2:any = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffHour = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let diff:string = (diffDays <=0) ?  diffHour + " hours" : diffDays + " days"
        return diff;
    }
    const [getSearchElement, setSearchElement] = useState<string>('')
    const [getSearchList, setSearchList] = useState<any>()

    const getImage = (share:any) => {
        let temp
        if(share.media.length != 0){
            share.media.map((imgUrl:any)=>{
                temp = imgUrl['media-metadata'][2].url
            })
        }
        return temp
    }

    const getData = () => {
        if(!props.share.loading && props.share.shares.length){
            setSearchList(props.share.shares) 
        }
        else if(localStorage.getItem('share')){
            const storedData = localStorage.getItem('share');
            if (storedData == null) {
                return null;
            }else{
                const item = JSON.parse(storedData);
                setSearchList(item)
            }
        }
    }

    const getSearchData = () => {
        const storedData = localStorage.getItem('share');
        if (storedData == null) {
            return [];
        }else{
            const item = JSON.parse(storedData);
            return item
        }
    }
    
    useEffect(()=>{
        let searchField;
        const dataList = getSearchData();
        searchField = (dataList.length<=0) ? props.share.shares : dataList
        const filteredNews = searchField.filter((news:any) => {
            return (news.title.toLowerCase().indexOf(getSearchElement.toLowerCase()) !== -1)
        });
        setSearchList(filteredNews)
    }, [getSearchElement])

    useEffect(()=>{
        getData()
    }, [props.share])

    return (
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    {props.share.loading && <div className="my-3">Loading...</div>}
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {!props.share.loading && props.share.error ? <div>Error: {props.share.error}</div> : null}
                </div>
            </div>
            {(!props.share.loading && props.share.shares.length) || localStorage.getItem('share') ? (
                <>
                    <div className='row'>
                        <div className='col-md-6 col-sm-0'></div>
                        <div className='col-md-6 col-sm-12'>
                            <form>
                                <div className="my-3 d-flex">
                                    <input type="text" className="form-control" style={{marginRight: '0.5rem', marginLeft: '0.5rem'}} onChange={(event)=>setSearchElement(event.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        {getSearchList && getSearchList.map((share:any, index:number) =>
                            <>
                                <div key={index} className={(getSearchList.length == (index+1)) || (index+1) % 3 == 0 ? withoutBorderDesign : withBorderDesign}>
                                    <div className='m-2'>
                                        <div className="card boder border-white m-auto" style={{width:'100%', height:'auto'}}>
                                            <div className="card-body p-0">
                                                <img src={getImage(share)?getImage(share):'src/asset/noImage.png'} className="card-img-top my-3" alt="..."/>
                                                <div className='pb-3'>
                                                    <h5 className="card-title text-start">{share.title}</h5>
                                                    <p className="card-text text-start">{share.abstract}</p>
                                                    <p className="card-text text-start"><small className="text-muted">Last updated {dateDiff(share.updated)} ago</small></p>
                                                    <p className="card-text text-start"><small className="text-muted">{dateDiff(share.published_date)} ago . {share.byline}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default MostShared;