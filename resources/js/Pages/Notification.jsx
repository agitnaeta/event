import {Link, useForm} from "@inertiajs/react";

export default function Notification({notifications}) {

    const {
        data,
        setData,
        put,
        errors,
        processing
    } = useForm({})

    const handleSubmit =(e)=>{
        e.preventDefault();
        put(`/notification/${e.target.id}`,{
            preserveScroll: false,
        })
    }

    if(!notifications){
       return ( <h1 className={'text-4xl mb-4'}>Notification List</h1> )
    }
    return (
        <div className="overflow-x-auto">
            <h1 className={'text-4xl mb-4'}>Notification List</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Retry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {notifications.data.map((notification) => (
                    <tr key={notification.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.event.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.sent_at ?? '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {notification.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {notification.retry}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button onClick={handleSubmit} id={notification.id} className={"btn-primary"}>
                                {processing ? 'Sending' :'Retry'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="py-12 px-4 text-center">
                {notifications.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${
                                link.active ? "text-blue--500 font-bold" : ""
                            }`}
                        />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </div>
    );
}
