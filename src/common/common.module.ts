import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [], // Importante para que se puedan utilizar en otros módulos
  imports: [], // Importar módulos adicionales que necesite este módulo
})
export class CommonModule {}
