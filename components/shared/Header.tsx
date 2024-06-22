import React from 'react'

const Header = ({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <div>
            <h2 className='h2-bold text-dark-600'>{title}</h2>
            <p>{subTitle}</p>
        </div>
    )
}

export default Header