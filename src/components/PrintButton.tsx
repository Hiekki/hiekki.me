'use client';

export default function PrintButton() {
    return (
        <button
            type='button'
            onClick={() => window.print()}
            className='cursor-pointer rounded-full bg-[#14171f] px-5 py-2.5 text-[0.95rem] font-semibold text-white'
        >
            Save as PDF
        </button>
    );
}
