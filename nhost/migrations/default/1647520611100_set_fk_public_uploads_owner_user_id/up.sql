alter table "public"."uploads"
  add constraint "uploads_owner_user_id_fkey"
  foreign key ("owner_user_id")
  references "auth"."users"
  ("id") on update restrict on delete restrict;
