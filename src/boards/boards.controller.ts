import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
     constructor(private boardsService:BoardsService){}

            @Get()
            getAllTask():Promise<Board[]>{
                return this.boardsService.getAllBoards();
            }

    //     @Get()
    //     getAllBoard():Board[]{
    //     return this.boardsService.getAllBoards();
    //     }

    //     @Post()
    //     @UsePipes(ValidationPipe)
    //     createBoard(
    //         @Body() createBoardDto:CreateBoardDto,
    //     ):Board{
    //         return this.boardsService.createBoard(createBoardDto);
    //     }


            @Post()
            @UsePipes(ValidationPipe)
            createBoard(
                @Body() createBoardDto:CreateBoardDto,
            @GetUser() user:User):Promise<Board>{
                return this.boardsService.createBoard(createBoardDto,user);
            }


            @Get('/:id')
            getBoardById(@Param('id') id:number):Promise<Board>{
                return this.boardsService.getBoardById(id);
            }

    //     @Get('/:id')
    //     getBoardById(@Param('id') id:string):Board{
    //         return this.boardsService.getBoardById(id);
    //     }

            @Delete('/:id')
            deleteBoard(@Param('id',ParseIntPipe) id):Promise<void>{
                return this.boardsService.deleteBoard(id);
            }

    //     @Delete('/:id')
    //     deleteBoard(@Param('id') id:string):void{
    //         this.boardsService.deleteBoard(id)
    //     }

            @Patch('/:id/status')
            updateBoardStatus(
                @Param('id',ParseIntPipe) id:number,
                @Body('status',BoardStatusValidationPipe) status:BoardStatus,
            ): Promise<Board>{
                return this.boardsService.updateBoardStatus(id,status)
            }
    //     @Patch('/:id/status')
    //     updateBoardStatus(
    //         @Param('id') id:string,
    //         @Body('status',BoardStatusValidationPipe) status:BoardStatus,
    //     ){
    //         return this.boardsService.updateBoardStatus(id,status)
    //     }
    
}
