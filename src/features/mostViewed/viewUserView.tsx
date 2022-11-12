import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import MostViewed from '../../components/body/bodyComponents/MostViewed'
import { fetchView } from './viewSlice'

export const ViewUserView = () => {
  const view = useAppSelector(state => state.view)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(localStorage.getItem("view") == null){
      dispatch(fetchView())
    }
  }, [])
  return (
    <div>
      <MostViewed view={view}/>
    </div>
  )
}
