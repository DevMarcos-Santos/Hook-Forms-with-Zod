import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function App() {
  const [data, setData] = useState([]);
  const onSubmit = (data: any) => {
    setData(data);
  };

  const dataSchema = z.object({
    name: z.string(),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'a senha precisa ter 8 caracteres'),
  });

  type datacShcemaZod = z.infer<typeof dataSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<datacShcemaZod>({
    resolver: zodResolver(dataSchema),
  });
  return (
    <div className="flex justify-center h-screen items-center bg-zinc-800">
      <div className="bg-black w-[500px] h-[500px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col pl-7 pr-7 mt-5">
            <label className="text-white">Nome</label>
            <input
              {...register('name')}
              className="bg-zinc-800 rounded mt-2 text-white p-2"
              type="text"
            />
           <label style={{fontSize:'12px'}} className='text-red-600 mt-1'>{errors.name?.message}</label>
          </div>
          <div className="flex flex-col pl-7 pr-7 mt-5">
            <label className="text-white">Email</label>
            <input
              {...register('email')}
              className="bg-zinc-800 rounded mt-2 text-white p-2"
              type="email"
            />
            <label style={{fontSize:'12px'}} className='text-red-600 mt-1'>{errors.email?.message}</label>
          </div>
          <div className="flex flex-col pl-7 pr-7 mt-2">
            <label className="text-white">Senha</label>
            <input
              {...register('password')}
              className="bg-zinc-800 rounded mt-2 text-white p-2"
              type="password"
              autoComplete="on"
            />
            <label style={{fontSize:'12px'}} className='text-red-600 mt-1'>{errors.password?.message}</label>
          </div>
          <div className="flex flex-col pl-7 pr-7">
            <button
              type="submit"
              className="bg-emerald-500 w-[100%] rounded h-10 text-white font-bold mt-5"
            >
              Enviar
            </button>
          </div>
          <div className=' className="flex flex-col pl-7 pr-7 "'>
            <pre
              className="text-white mt-5"
              style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
