import React, { Fragment }  from 'react'

const BudgetTableBody = ({categories}) => {
    let name;
    return (
        <tbody className="budget-table">
        {categories && categories.length && (
            categories.map((label, idx) =>{
                const header = Object.keys(label)[0];
                const values = Object.values(label);
                return(
                    <Fragment>
                        <tr key={header+idx}><td colspan ='4'><h2>{header}</h2></td></tr>
                        {values && values[0] && (
                            values[0].map((c, idx) => {
                                name = Object.keys(c)[0]
                                return(
                                    <tr key={name+idx}>
                                        <td><p style={{paddingLeft:'20px'}}>{name}</p></td>
                                        <td><p>{c[name].budgeted}</p></td>
                                        <td><p>{c[name].activity}</p></td>
                                        <td><p>{c[name].available}</p></td>
                                    </tr>
                                )
                            })
                        )}
                    </Fragment>
                )
            })
        )}
      </tbody>
    )
}

export default BudgetTableBody
