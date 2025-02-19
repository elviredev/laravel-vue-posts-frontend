import { defaultConfig } from '@formkit/vue'

export default defaultConfig({
    config: {
        classes: {
            form: 'max-w-[24em] mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800',
            label: '',
            input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500',
            message: 'text-red-500 text-xs italic',
            actions: 'flex justify-end mt-4',
            // submit: 'text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
        }
    },
})