import logoSalt from './logo-salt-sem-fundo.png'

const Logo = () => {
  return (
    <div className="mb-6 md:mb-10 text-center">
      {/* Referência ao GoRN */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px bg-gradient-to-r from-transparent via-gorn-pink to-gorn-cyan flex-1 max-w-20"></div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gorn-pink to-gorn-cyan rounded-lg blur-md opacity-30"></div>
            <img 
              src="/logo-gorn-2025.svg" 
              alt="GoRN Logo" 
              className="h-24 md:h-32 lg:h-40 object-contain mx-auto relative z-10"
            />
          </div>
          <div className="h-px bg-gradient-to-l from-transparent via-gorn-pink to-gorn-cyan flex-1 max-w-20"></div>
        </div>
        <p className="text-xs text-gray-600">
          07-08 de Novembro • Centro de Convenções de Natal
        </p>
      </div>
      
      {/* Logo Salt Valley */}
      <div className="inline-block mb-4">
        <img 
          src={logoSalt} 
          alt="Salt Valley Logo" 
          className="h-24 md:h-32 lg:h-40 object-contain mx-auto"
        />
      </div>
      
      <p className="text-sm md:text-base text-gray-700 mt-2 font-medium">
        Conquiste seu selo no evento
      </p>
      <p className="text-xs text-gray-600 mt-1">
        O maior evento de empreendedorismo, tecnologia e inovação do RN
      </p>
    </div>
  )
}

export default Logo

