import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


// const options = {
//     title: 'Title',
//     message: 'Message',
//     buttons: [
//         {
//             label: 'Yes',
//             onClick: () => alert('Click Yes')
//         },
//         {
//             label: 'No',
//             onClick: () => alert('Click No')
//         }
//     ],
    // childrenElement: () => <div />,
    // customUI: ({ onClose }) => <div>Custom UI</div>,
//     closeOnEscape: true,
//     closeOnClickOutside: true,
//     willUnmount: () => { },
//     afterClose: () => { },
//     onClickOutside: () => { },
//     onKeypressEscape: () => { }
// };

// confirmAlert(options);

// const Alert = () => {
export const submit = () => {
    confirmAlert({
        title: 'Comming Soon...',
        // message: 'Are you sure to do this.',
        buttons: [
            // {
            //     label: 'Yes',
            //     onClick: () => alert('Click Yes')
            // },
            // {
            //     label: 'No',
            //     onClick: () => alert('Click No')
            // }
        ]
    });
};


//     return (
//         <div className='container'>
//             <button onClick={submit}>Confirm dialog</button>
//         </div>
//     );


// }

// export default submit