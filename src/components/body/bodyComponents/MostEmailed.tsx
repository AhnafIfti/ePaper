import React, { useState, useEffect } from 'react';

const MostEmailed = (props:any) => {
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
    const [getSearchList, setSearchList] = useState<any | string>()

    const getImage = (email:any) => {
        let temp
        if(email.media.length != 0){
            email.media.map((imgUrl:any)=>{
                temp = imgUrl['media-metadata'][2].url
            })
        }
        return temp
    }

    const getData = () => {
        if(!props.email.loading && props.email.emails.length){
            setSearchList(props.email.emails) 
        }
        else if(localStorage.getItem('email')){
            const storedData = localStorage.getItem('email');
            if (storedData == null) {
                return null;
            }else{
                const item = JSON.parse(storedData);
                setSearchList(item)
            }
        }
    }

    const getSearchData = () => {
        const storedData = localStorage.getItem('email');
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
        searchField = (dataList.length<=0) ? props.email.emails : dataList
        const filteredNews = searchField.filter((news:any) => {
            return (news.title.toLowerCase().indexOf(getSearchElement.toLowerCase()) !== -1)
        });
        setSearchList(filteredNews)
    }, [getSearchElement])

    useEffect(()=>{
        getData()
    }, [props.email])
    
    return (
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    {props.email.loading && <div className="my-3">Loading...</div>}
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {!props.email.loading && props.email.error ? <div>Error: {props.email.error}</div> : null}
                </div>
            </div>
            {(!props.email.loading && props.email.emails.length) || localStorage.getItem('email') ? (
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
                        {getSearchList && getSearchList.map((email:any, index:number) =>
                            <>
                                <div key={index} className={(getSearchList.length == (index+1)) || (index+1) % 3 == 0 ? withoutBorderDesign : withBorderDesign}>
                                    <div className='m-2'>
                                        <div className="card boder border-white m-auto" style={{width:'100%', height:'auto'}}>
                                            <div className="card-body p-0">
                                                <img src={getImage(email)?getImage(email):'src/asset/noImage.png'} className="card-img-top my-3" alt="..."/>
                                                <div className='pb-3'>
                                                    <h5 className="card-title text-start">{email.title}</h5>
                                                    <p className="card-text text-start">{email.abstract}</p>
                                                    <p className="card-text text-start"><small className="text-muted">Last updated {dateDiff(email.updated)} ago</small></p>
                                                    <p className="card-text text-start"><small className="text-muted">{dateDiff(email.published_date)} ago . {email.byline}</small></p>
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

export default MostEmailed;