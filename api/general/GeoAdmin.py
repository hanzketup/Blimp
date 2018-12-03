from django.contrib.gis import admin, forms


class GeoAdminForm(forms.ModelForm):
    position = forms.PointField(widget=forms.OSMWidget(attrs={
            'display_raw': True}))


class GeoAdmin(admin.GeoModelAdmin):
    form = GeoAdminForm
