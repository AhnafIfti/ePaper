import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import MostEmailed from '../../components/body/bodyComponents/MostEmailed'
import { fetchEmail } from './emailSlice'

export const EmailView = () => {
  const email = useAppSelector(state => state.email)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(localStorage.getItem("email") == null) {
      dispatch(fetchEmail()).then((r) => {});
    }
  }, [])
  return (
    <div>
      <MostEmailed email={email}/>
    </div>
  )
}
