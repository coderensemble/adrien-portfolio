import React from 'react';
import TextDecrypt from '../TextDecrypt/textDecrypt';
import { FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <div className=''>
    <a
      href="https://drive.google.com/file/d/1qPbze847SGSoigLPqgJx_lfg-v-E1qzF/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[6em] sm:bottom-[4em] rotate-[-90deg] flex items-center hover:text-primary transition-all "
    >
      <FileText/>
      <span>
        Resume
      </span>
    </a>
    </div>
  );
};
