import { Module } from '@nestjs/common'
import { CollectionPointsService } from './collection-points.service'
import { CollectionPointsController } from './collection-points.controller'

@Module({
	controllers: [CollectionPointsController],
	providers: [CollectionPointsService]
})
export class CollectionPointsModule {}
