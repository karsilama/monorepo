import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { LIST_ROW_CONTEXT } from "@lab/list-page/feature";
import { HighlightPipe } from "@lab/util";
import { UsersFacade } from "@users/+state";
import { UserDomainModel } from "@users/infrastructure";
import { DEFAULT_AVATAR } from "./user-custom-column.constant";

@Component({
  selector: "users-custom-column",
  templateUrl: "./user-custom-column.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "flex flex-row items-center",
  },
  imports: [HighlightPipe],
})
export class UserCustomColumn {
  public user = inject(LIST_ROW_CONTEXT) as UserDomainModel;
  public defaultAvatar = DEFAULT_AVATAR;
  public searchTerm = inject(UsersFacade).searchTerm;
}
