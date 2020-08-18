import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom';

/**
 * 
 * @param props
 * 
 */
export default function Manager(props: RouteComponentProps) {

  const navigatePaint = useCallback(() => {
    props.history.push('/paint');
  }, [props.history]);

  return (
    <div onClick={navigatePaint}>hello world manager page</div>
  );
}