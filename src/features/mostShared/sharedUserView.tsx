import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import MostShared from '../../components/body/bodyComponents/MostShared'
import { fetchShare } from './sharedSlice'

export const ShareView = () => {
  const share = useAppSelector(state => state.share)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(localStorage.getItem("share") == null){
      dispatch(fetchShare()).then((r) => {})
    }
  }, [])
  return (
    <div>
      <MostShared share={share} />
    </div>
  )
}
