import styles from './style.module.css';
import Button from '@/components/atoms/Button/Button';
import { ReactNode } from 'react';

type ItemWrapperProps={
    children:ReactNode,
}

const ItemWrapper = ({children}:ItemWrapperProps) => {
  return (
    <div className={styles.main}>{children}
     <Button
      title="Delete"
      isLoading={false}
      onClick={handleDelete}
      type="DANGER"/>


        
     
        
    </div>
  )
}

export default ItemWrapper