import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
    message: string
}

export const config ={
    api:{
        bodyParser:false
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    switch (req.method) {
        case 'POST':
            
            return uploadFile(req,res)
    
        default:
            res.status(400).json({message: 'Bad Request'})
    }

}

const saveFile = async(file: File): Promise<string>=>{
//   const data = fs.readFileSync(file.filepath);
//   fs.writeFileSync(`./public/${file.originalFilename}`,data);
//   fs.unlinkSync(file.filepath); //elimina
//   return;

const {secure_url} = await cloudinary.uploader.upload(file.filepath);

return secure_url

}


const parseFiles = async(req:NextApiRequest):Promise<string> =>{

    return new Promise((resolve,reject)=>{

        const form = new IncomingForm();
        form.parse(req, async(err,fields,files)=>{

            if(err){
                return reject(err);
            }

            const fileList: File[] = files.file as File[];
            const firstFile: File | undefined = fileList[0];

            const filePath = await saveFile(firstFile as File)
            resolve(filePath);
        })

    })


}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {

    const imageUrl = await parseFiles(req);


    res.status(200).json({message:imageUrl})

}
