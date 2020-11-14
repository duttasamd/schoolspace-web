import React from 'react';

export default function CollapseCard(props) {

    let eventlist = [];

    for (const item of props.data) {
        const event = (<div className="row mb-3">
            <div className="col-8">
                {item.name}
            </div>
            <div className="col-4">
                {item.date}
            </div>
        </div>);

        eventlist.push(event);
    }

    return(
        <div className={"card bordercard mt-3 " + props.border}>
            <div className="card-header card-header-clean p-1">
                <button className="btn btn-default btn-block" data-toggle="collapse" data-target= { "#" + props.id} aria-expanded="true" aria-controls={"#" + props.id }>
                    <span className="float-left ml-0 mr-auto"><strong>{ props.title }</strong></span>
                    <span className="badge badge-light float-right mt-1">{props.badge}</span>
                </button>
            </div>

            <div id={props.id} className="collapse" aria-labelledby="headingOne">
                <div className="card-body pt-3 px-3 pb-1">
                    {eventlist}
                </div>
            </div>
        </div>
    );
}