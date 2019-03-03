import React from 'react';

function Table(props) {
    return <table>{ renderChildren() }</table>;

    function renderChildren() {
        const childrenArr = React.Children.toArray(props.children);
        const theadChild = childrenArr.slice(0, 1);
        const tbodyChildren = childrenArr.slice(1);

        return [
            renderHead(theadChild),
            renderBody(tbodyChildren)
        ];
    }
    function renderHead(child) {
        if (!child) {
            return null;
        }
        return <thead key="t0">{ child[0] }</thead>;
    }
    function renderBody(children) {
        if (!children) {
            return null;
        }
        return <tbody key="t1">{ children }</tbody>;
    }
}

function Row(props) {
    return <tr>{ renderChildren() }</tr>;

    function renderChildren() {
        return React.Children.map(props.children, child => {
            return <Cell head={ props.head } >{ child }</Cell>;
        });
    }
}

function Cell(props) {
    if (props.head) {
        return <th>{ props.children }</th>;
    }
    return <td>{ props.children }</td>;
}

export default {
    Body: Table,
    Row: Row
};