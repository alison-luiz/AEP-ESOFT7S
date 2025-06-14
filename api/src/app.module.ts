import { Module } from '@nestjs/common'
import { CollectionPointsModule } from './collection-points/collection-points.module'

@Module({
	imports: [CollectionPointsModule],
	controllers: [],
	providers: []
})
export class AppModule {}
