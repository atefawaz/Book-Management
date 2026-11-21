import { IsIn, IsNumber, IsString } from "class-validator"


export class CreateBookDto {
    @IsString()
    readonly title : string

    @IsString()
    @IsIn(['fiction','science','history'])
    readonly genre : string

    @IsNumber()
    readonly publishedYear : number
}
