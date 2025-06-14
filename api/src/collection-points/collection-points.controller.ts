import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import {
	CollectionPointsService,
	CollectionPoint
} from './collection-points.service'

@Controller('collection-points')
export class CollectionPointsController {
	constructor(
		private readonly collectionPointsService: CollectionPointsService
	) {}

	@Get()
	findAll(): CollectionPoint[] {
		return this.collectionPointsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): CollectionPoint {
		const point = this.collectionPointsService.findOne(+id)
		if (!point) {
			throw new HttpException(
				'Ponto de coleta não encontrado',
				HttpStatus.NOT_FOUND
			)
		}
		return point
	}

	@Post()
	create(@Body() point: Omit<CollectionPoint, 'id'>): CollectionPoint {
		return this.collectionPointsService.create(point)
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() point: Partial<CollectionPoint>
	): CollectionPoint {
		const updatedPoint = this.collectionPointsService.update(+id, point)
		if (!updatedPoint) {
			throw new HttpException(
				'Ponto de coleta não encontrado',
				HttpStatus.NOT_FOUND
			)
		}
		return updatedPoint
	}

	@Delete(':id')
	remove(@Param('id') id: string): { success: boolean } {
		const success = this.collectionPointsService.remove(+id)
		if (!success) {
			throw new HttpException(
				'Ponto de coleta não encontrado',
				HttpStatus.NOT_FOUND
			)
		}
		return { success }
	}
}
