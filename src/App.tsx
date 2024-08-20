import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

function App() {
  const [data, setData] = useState([]);
  const dataSchemaZod = z.object({
    name: z.string(),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha precisa ter 8 caracteres'),
  });
  type formSchema = z.infer<typeof dataSchemaZod>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(dataSchemaZod),
  });

  const onSubmit = (data: any) => {
    setData(data);
  };

  return (
    <>
      <div className="bg-zinc-900 h-screen flex justify-center items-center">
        <div className="w-[500px] bg-black h-auto rounded">
          <form onSubmit={handleSubmit(onSubmit)} className="p-10">
            <div className="mt-2">
              <label className="text-white">Nome</label>
              <input
                className="w-full bg-zinc-900 p-2 text-white mt-2"
                type="text"
                {...register('name')}
              />
              <label style={{ fontSize: '12px' }} className="text-red-600 ">
                {errors.name?.message}
              </label>
            </div>
            <div className="mt-5">
              <label className="text-white">Email</label>
              <input
                className="w-full bg-zinc-900 p-2 text-white mt-2"
                type="email"
                {...register('email')}
              />
              <label style={{ fontSize: '12px' }} className="text-red-600 ">
                {errors.email?.message}
              </label>
            </div>
            <div className="mt-5">
              <label className="text-white">Senha</label>
              <input
                className="w-full bg-zinc-900 p-2 text-white mt-2"
                type="password"
                autoComplete="on"
                {...register('password')}
              />
              <label style={{ fontSize: '12px' }} className="text-red-600 ">
                {errors.password?.message}
              </label>
            </div>
            <button
              className="w-full bg-emerald-500 text-white font-semibold mt-7 h-10 rounded"
              type="submit"
            >
              Enviar
            </button>
            <div className="mt-4">
              <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
